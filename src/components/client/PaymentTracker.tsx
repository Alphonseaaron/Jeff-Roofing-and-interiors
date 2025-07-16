import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/lib/firestore";
import { Loading } from "@/components/ui/loading";
import { PAYMENT_STATUS } from "@shared/schema";

interface PaymentTrackerProps {
  projectId: string;
}

export function PaymentTracker({ projectId }: PaymentTrackerProps) {
  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['payments', projectId],
    queryFn: () => getPayments(projectId),
    enabled: !!projectId,
  });

  if (isLoading) {
    return <Loading text="Loading payment information..." />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error loading payments. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No payment information available.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case PAYMENT_STATUS.PAID:
        return <Badge className="status-paid">Paid</Badge>;
      case PAYMENT_STATUS.DUE:
        return <Badge className="status-due">Due</Badge>;
      case PAYMENT_STATUS.OVERDUE:
        return <Badge className="status-overdue">Overdue</Badge>;
      case PAYMENT_STATUS.PENDING:
        return <Badge variant="outline" className="status-pending">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case PAYMENT_STATUS.PAID:
        return "bg-green-50";
      case PAYMENT_STATUS.DUE:
        return "bg-blue-50";
      case PAYMENT_STATUS.OVERDUE:
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className={`flex justify-between items-center p-3 rounded-lg ${getStatusColor(payment.status)}`}
            >
              <div>
                <p className="font-medium">{payment.description}</p>
                <p className="text-sm text-muted-foreground">
                  ${payment.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                </p>
              </div>
              {getStatusBadge(payment.status)}
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-primary-blue hover:bg-primary-blue-hover">
          Make Payment
        </Button>
      </CardContent>
    </Card>
  );
}

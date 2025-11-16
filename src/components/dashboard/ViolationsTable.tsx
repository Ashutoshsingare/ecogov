import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { violations } from "@/lib/data"

export default function ViolationsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flagged Violations</CardTitle>
        <CardDescription>
          A list of recent waste management violations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((violation) => (
              <TableRow key={violation.id}>
                <TableCell>{violation.date}</TableCell>
                <TableCell className="font-medium">{violation.location}</TableCell>
                <TableCell>{violation.type}</TableCell>
                <TableCell>{violation.reporter}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      violation.status === "Resolved"
                        ? "default"
                        : violation.status === "Pending"
                        ? "destructive"
                        : "secondary"
                    }
                    className={violation.status === 'Resolved' ? 'bg-green-600' : ''}
                  >
                    {violation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

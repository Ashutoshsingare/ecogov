import ProfileDetails from "@/components/profile/ProfileDetails";
import BadgesGrid from "@/components/profile/BadgesGrid";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { violations } from "@/lib/data";

const userReports = violations.filter(v => v.reporter === 'Citizen');

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Your EcoGov Journey</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Track your progress, view your achievements, and manage your profile.
          </p>
        </div>
      </AnimatedWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnimatedWrapper className="lg:col-span-2">
          <ProfileDetails />
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.1}>
          <BadgesGrid />
        </AnimatedWrapper>
        <AnimatedWrapper className="lg:col-span-3" delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>My Waste Reports</CardTitle>
              <CardDescription>A history of all the waste issues you've reported.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.location}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            report.status === "Resolved"
                              ? "default"
                              : report.status === "Pending"
                              ? "destructive"
                              : "secondary"
                          }
                          className={report.status === 'Resolved' ? 'bg-green-600' : ''}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedWrapper>
      </div>
    </div>
  );
}

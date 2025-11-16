"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";

export default function ProfileDetails() {
    const profileImage = PlaceHolderImages.find(p => p.id === 'profile-avatar');
    const [progress, setProgress] = useState(66);

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    {profileImage && <Avatar className="h-20 w-20">
                        <AvatarImage src={profileImage.imageUrl} alt="User avatar" data-ai-hint={profileImage.imageHint} />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>}
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-muted-foreground">Joined July 2024</p>
                    </div>
                     <Button variant="outline">Change Photo</Button>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                    <Label>Training Progress</Label>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-right">{progress}% complete</p>
                </div>
            </CardContent>
            <CardFooter>
                 <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}

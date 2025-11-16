"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ProfileDetails() {
    const profileImage = PlaceHolderImages.find(p => p.id === 'profile-avatar');
    const [progress, setProgress] = useState(66);
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [avatar, setAvatar] = useState(profileImage?.imageUrl);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast({
            title: "Profile updated!",
            description: "Your changes have been saved successfully.",
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = async () => {
                // Simulate upload
                await new Promise(resolve => setTimeout(resolve, 1000));
                setAvatar(reader.result as string);
                setIsUploading(false);
                toast({
                    title: "Avatar updated!",
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={avatar} alt="User avatar" data-ai-hint={profileImage?.imageHint} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <p className="text-muted-foreground">Joined July 2024</p>
                    </div>
                     <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                        Change Photo
                     </Button>
                     <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} disabled />
                </div>
                <div className="space-y-2">
                    <Label>Training Progress</Label>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-right">{progress}% complete</p>
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    )
}

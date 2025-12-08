"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { Skeleton } from "../ui/skeleton";
import { updateProfile } from "firebase/auth";

export default function ProfileDetails() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const profileImage = PlaceHolderImages.find(p => p.id === 'profile-avatar');
    
    const [progress, setProgress] = useState(66);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(profileImage?.imageUrl);
    
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setAvatar(user.photoURL || profileImage?.imageUrl);
        }
    }, [user, profileImage]);

    const handleSave = async () => {
        if (!auth.currentUser) {
            toast({ variant: "destructive", title: "You must be logged in."});
            return;
        };

        setIsSaving(true);
        try {
            await updateProfile(auth.currentUser, { displayName: name });
            toast({
                title: "Profile updated!",
                description: "Your changes have been saved successfully.",
            });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && auth.currentUser) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = async () => {
                // In a real app, you would upload this to Firebase Storage and get a URL
                const photoURL = reader.result as string; 
                try {
                    await updateProfile(auth.currentUser!, { photoURL: photoURL });
                    setAvatar(photoURL);
                    toast({ title: "Avatar updated!" });
                } catch (error: any) {
                     toast({ variant: "destructive", title: "Upload Failed", description: error.message });
                } finally {
                    setIsUploading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (isUserLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>View and edit your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="flex-grow space-y-2">
                           <Skeleton className="h-6 w-1/2" />
                           <Skeleton className="h-4 w-1/3" />
                        </div>
                         <Skeleton className="h-10 w-24" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                     <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        )
    }

    if (!user) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Please log in to view your profile.</p>
                </CardContent>
            </Card>
        )
    }

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
                            <AvatarFallback>{name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{name || 'Anonymous User'}</h3>
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
                    <Input id="email" type="email" value={user?.email || ''} disabled />
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

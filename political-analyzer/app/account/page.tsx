"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Download, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AuthRouteGuard } from "@/components/auth-route-guard"
import axios from 'axios';
import { useAuth } from "@/contexts/auth-context"


export default function AccountPage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user, updateUser, logout } = useAuth();


  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const userInfo = {
      name: name,
      email: email,
      password: "",
    }

    try {
      const response = await axios.put(`/api/updateUser/?user_id=${user?.id}`, userInfo);
      
      updateUser({ name, email });
      console.log(response.data);
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully",
      });

    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed", {
        description: "There was a problem updating your profile",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    const newPass = {
      name: "",
      email: "",
      password: newPassword,
    }

    if (newPassword !== confirmPassword) {
      toast.error("Error", {
        description: "New passwords do not match",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.put(`/api/updateUser/?user_id=${user?.id}`, newPass);
      console.log(response.data);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated", {
        description: "Your password has been updated successfully",
      });
    } catch (error) {
      console.error("Password Update Failed:", error);
      toast.error("Password update failed", {
        description: "There was a problem updating your password",
      });
    } finally {
      setIsLoading(false);
    }

  }

  //TODO: Allow user to download db data into CSV
  const handleDownloadData = async () => {

    try {
      const response = await axios.get(`/api/download/?user_id=${user?.id}`,
        {
          responseType: 'blob'
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `user_${user?.id}_info.json`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      toast.success("Data export initiated", {
        description: "Your data has successfully downloaded",
      })

    } catch (error) {
      console.error("Password Update Failed:", error);
      toast.error("Data Export failed", {
        description: "There was a problem downloading your data",
      });
    }
  }


  // Delete Account
  // Remove from localStorage
  // Redirect to Home
  const handleAccountDeletion = async () => {
    try {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        const response = await axios.delete(`/api/updateUser/?user_id=${user?.id}`);  //Delete from DB
        console.log(response.data);
        logout();
        toast.success("Account deleted", {
          description: "Your account has been permanently deleted",
        })
      }
    } catch (error) {
      console.error("Acoount Deletion Failed:", error);
      toast.error("Account Deletion failed", {
        description: "There was a problem deleting your account",
      });
    }
  }





  return (
    <AuthRouteGuard>
      <div className="container py-8 px-4 md:py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Account Settings</h1>
          <p className="text-muted-foreground max-w-[700px]">Manage your account settings and preferences</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="data">Data & Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateProfile}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password and security preferences</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdatePassword}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications about your account</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update password"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Manage your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Download Your Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data including saved articles and analysis history
                    </p>
                    <Button onClick={handleDownloadData}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Data
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        Deleting your account is permanent and cannot be undone. All your data will be permanently
                        removed.
                      </AlertDescription>
                    </Alert>
                    <Button
                      variant="destructive"
                      onClick={handleAccountDeletion}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthRouteGuard>
  )
}

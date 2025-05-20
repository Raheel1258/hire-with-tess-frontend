import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function JobDescription() {
    return (
        <>
            <Label className="mb-2">Job Description</Label>
            <Card>
                <Label className="ml-6">Responsibilities</Label>
            </Card>

            <Label className="mb-2 mt-4">Skills</Label>
            <Card>
                {/* <Label className="ml-6">Responsibilities</Label>
                <CardContent className="flex flex-row w-full gap-4">
                    <Card>Coding Proficiency</Card>
                    <Card>Problem Solving</Card>
                    <Card>Algorithm Thinking</Card>
                    <Card>Time Managment</Card>
                </CardContent> */}
            </Card>
        </>

    )
}
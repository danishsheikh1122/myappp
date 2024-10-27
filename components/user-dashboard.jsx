"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { Activity, Calendar, CreditCard, Dumbbell, Users, Video } from "lucide-react"
import { useUser } from '@clerk/nextjs'
import { chatSession } from "../utils/gemini";
import Link from 'next/link'
import toast from "react-hot-toast"
// Sample data for charts
const weeklyActivityData = [
  { day: "Mon", steps: 5000, duration: 30 },
  { day: "Tue", steps: 6000, duration: 45 },
  { day: "Wed", steps: 4500, duration: 25 },
  { day: "Thu", steps: 7000, duration: 60 },
  { day: "Fri", steps: 5500, duration: 40 },
  { day: "Sat", steps: 8000, duration: 75 },
  { day: "Sun", steps: 6500, duration: 50 },
];

const monthlyPointsData = [
  { week: "Week 1", points: 100 },
  { week: "Week 2", points: 150 },
  { week: "Week 3", points: 120 },
  { week: "Week 4", points: 180 },
];
const weeklyBPData = [
  { day: "Monday", systolic: 120, diastolic: 80 },
  { day: "Tuesday", systolic: 118, diastolic: 82 },
  { day: "Wednesday", systolic: 122, diastolic: 78 },
  { day: "Thursday", systolic: 125, diastolic: 80 },
  { day: "Friday", systolic: 119, diastolic: 79 },
  { day: "Saturday", systolic: 124, diastolic: 81 },
  { day: "Sunday", systolic: 121, diastolic: 77 },
];


export default function UserDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [report, setReport] = useState("");
  const handleGenerateReport = async () => {
    // Proper prompt construction
    const userInput = `For age: 60, BP: 85, exercise: 4 days/week, provide JSON with:
1. Yoga: type, benefits, poses, frequency, duration.
2. Diet: focus, recommendations, meal plan (breakfast, lunch, dinner).
3. Notes on health advice.

JSON format only.`;


    // Send message to chat session and get the result
    try {

      const result = await chatSession.sendMessage(userInput);

      console.log(result); // Log the entire result
      let jsonRes = result.response.text()
        .replace("```json", "")
        .replace("```", "")
        .trim(); // Also trim any whitespace

      console.log("Raw JSON Response:", jsonRes); // Log the cleaned response
      toast.success("Report Generated Successfully");
      const res = JSON.parse(jsonRes);
      setReport(res)
    } catch (error) {
      toast.error("Error Generated in report")
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.firstName}!</h1>
        <span className="text-green-500 font-bold text-3xl mr-20">100 Points </span>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Progress Tracking</TabsTrigger>
          <TabsTrigger value="exercise">Report</TabsTrigger>
          <TabsTrigger value="vr">VR Testing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Weekly Steps", value: "45,231", progress: 75, icon: <Dumbbell /> },
              { title: "Average BP ", value: "45", progress: 75, icon: <Dumbbell /> },
              { title: "Active Minutes", value: "325 min", progress: 65, icon: <Activity /> },
              // { title: "Upcoming Meetings", value: "3", info: "Next: Book Club (Tomorrow)", icon: <Users /> },
              { title: "Weekly Points", value: "550", progress: 87, info: "80 points to next level", icon: <CreditCard /> },
            ].map(({ title, value, progress, info, icon }, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{title}</CardTitle>
                  <span className="h-4 w-4 text-muted-foreground">{icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  {info && <p className="text-xs text-muted-foreground">{info}</p>}
                  {progress !== undefined && <Progress value={progress} className="mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <ChartContainer
                config={{
                  steps: { label: "Steps", color: "hsl(var(--chart-1))" },
                  duration: { label: "Active Minutes", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="steps" stroke="var(--color-steps)" name="Steps" />
                    <Line yAxisId="right" type="monotone" dataKey="duration" stroke="var(--color-duration)" name="Active Minutes" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              {/* bp chart  */}
              <ChartContainer
                config={{
                  systolic: { label: "Systolic BP", color: "hsl(var(--chart-3))" },
                  diastolic: { label: "Diastolic BP", color: "hsl(var(--chart-4))" },
                }}
                className="h-[300px] mt-6"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyBPData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="systolic" stroke="var(--color-systolic)" name="Systolic BP" />
                    <Line yAxisId="left" type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" name="Diastolic BP" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exercise Tab */}
        <TabsContent value="exercise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Report</CardTitle>
              <CardDescription>Your personalized weekly report</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <button
                  className="bg-black text-white py-2 px-4 rounded-full"
                  onClick={handleGenerateReport}
                >
                  Generate Report Based on My Activities
                </button>
              </div>

              {report && (
                <div className="mt-6">
                  <span className="text-green-500 font-bold">Congratulations , Here is your Health Report</span>
                  <h3 className="text-xl font-semibold">Age: 60</h3>
                  <p className="mb-2">
                    <strong>Average BP:</strong> 85
                  </p>
                  <p className="mb-4">
                    <strong>Exercise Frequency:</strong> 4 days/week
                  </p>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold">Yoga Recommendations:</h4>
                    <p>
                      <strong>Type:</strong> {report.yoga.type}
                    </p>
                    <p>
                      <strong>Benefits:</strong>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        {report.yoga.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </p>
                    <p>
                      <strong>Frequency:</strong> {report.yoga.frequency}
                    </p>
                    <p>
                      <strong>Duration:</strong> {report.yoga.duration}
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-2">
                      {report.yoga.poses.map((pose, index) => (
                        <li key={index}>{pose}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold">Diet Recommendations:</h4>
                    <p>
                      <strong>Focus:</strong> {report.diet.focus}
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-2">
                      {report.diet.recommendations.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-md font-semibold">Sample Meal Plan:</h5>
                    <p>
                      <strong>Breakfast:</strong> {report.diet.meal_plan.breakfast}
                    </p>
                    <p>
                      <strong>Lunch:</strong> {report.diet.meal_plan.lunch}
                    </p>
                    <p>
                      <strong>Dinner:</strong> {report.diet.meal_plan.dinner}
                    </p>
                  </div>

                  <p className="text-sm mt-6 italic">
                    <strong>Health Advice:</strong>
                    <ul className="list-disc list-inside ml-6 mt-2">
                      {report.health_advice.map((advice, index) => (
                        <li key={index}>{advice}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}
            </CardContent>

          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Morning Yoga", duration: "30 minutes", icon: <Dumbbell /> },
                  { title: "Afternoon Walk", duration: "45 minutes", icon: <Activity /> },
                  { title: "Evening Stretching", duration: "15 minutes", icon: <Dumbbell /> },
                ].map(({ title, duration, icon }, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-5 w-5 mr-2">{icon}</span>
                      <span>{title}</span>
                    </div>
                    <span className="text-muted-foreground">{duration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        {/* VR Testing Tab */}
        <TabsContent value="vr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VR Testing Features</CardTitle>
              <CardDescription>Explore virtual reality experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Virtual Nature Walk</h3>
                    <p className="text-sm text-muted-foreground">Immerse yourself in a peaceful forest</p>
                  </div>
                  <Link href={'/VRYogaRoom'}><Button>Start Experience</Button></Link>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Memory Lane</h3>
                    <p className="text-sm text-muted-foreground">Revisit your favorite places</p>
                  </div>
                  <Link href={'/VRYogaRoom'}> <Button>Start Experience</Button></Link>
                </li>

              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>VR Experience Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Share your feedback about the VR experiences  participated in:</p>
              <textarea className="w-full border rounded-md p-2" rows="4" placeholder="Write your feedback here..."></textarea>
              <div className="flex justify-end mt-2">
                <Button variant="outline">Submit Feedback</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

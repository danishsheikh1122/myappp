'use client'
import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Button } from "../../components/ui/button"
import {Button} from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// import { Checkbox } from "@/components/checkbox"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ExerciseRecommendationForm = () => {
  const [formData, setFormData] = useState({ 
    age: '',
    gender: '',
    healthConditions: [],
    physicalCapability: '',
    preferences: [],
    additionalInfo: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server or process it further
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Exercise Recommendation Form</CardTitle>
          <CardDescription>Please provide your information to receive tailored exercise recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" placeholder="Enter your age" onChange={handleInputChange} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Gender</Label>
                <RadioGroup name="gender" onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Health Conditions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Arthritis', 'Osteoporosis', 'Heart Issues', 'Mobility Limitations'].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox 
                        id={condition.toLowerCase()} 
                        name="healthConditions"
                        value={condition}
                        onCheckedChange={(checked) => handleCheckboxChange({ target: { name: 'healthConditions', value: condition, checked } })}
                      />
                      <Label htmlFor={condition.toLowerCase()}>{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="physicalCapability">Physical Capability Level</Label>
                <Select name="physicalCapability" onValueChange={(value) => setFormData(prev => ({ ...prev, physicalCapability: value }))}>
                  <SelectTrigger id="physicalCapability">
                    <SelectValue placeholder="Select your physical capability level" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="low">Low - I have difficulty with daily activities</SelectItem>
                    <SelectItem value="moderate">Moderate - I can do most daily activities with some effort</SelectItem>
                    <SelectItem value="high">High - I can do all daily activities without difficulty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Exercise Preferences</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Stretching', 'Strength Training', 'Balance Exercises', 'Chair Exercises'].map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox 
                        id={preference.toLowerCase().replace(' ', '-')} 
                        name="preferences"
                        value={preference}
                        onCheckedChange={(checked) => handleCheckboxChange({ target: { name: 'preferences', value: preference, checked } })}
                      />
                      <Label htmlFor={preference.toLowerCase().replace(' ', '-')}>{preference}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea 
                  id="additionalInfo" 
                  name="additionalInfo" 
                  placeholder="Please provide any additional information that may be relevant to your exercise recommendations"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExerciseRecommendationForm
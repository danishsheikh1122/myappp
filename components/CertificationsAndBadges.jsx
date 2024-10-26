"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";
import CustomCard from "@/components/CustomCard"; // Import your custom card component

// Sample data for certifications and badges
const certifications = [
  { id: 1, name: "Yoga Master", description: "Completed 50 yoga sessions", image: "https://tse3.mm.bing.net/th?id=OIP.fzM8Lk01PAg3vL72DtAUSAHaFL&pid=Api&P=0&h=180" },
  { id: 2, name: "Mindfulness Guru", description: "Practiced meditation for 30 days", image: "https://tse3.mm.bing.net/th?id=OIP.fzM8Lk01PAg3vL72DtAUSAHaFL&pid=Api&P=0&h=180" },
  { id: 3, name: "Social Butterfly", description: "Attended 20 virtual meetups", image: "https://tse3.mm.bing.net/th?id=OIP.fzM8Lk01PAg3vL72DtAUSAHaFL&pid=Api&P=0&h=180" },
];

const badges = [
  { id: 1, name: "Step Champion", description: "Walked 10,000 steps in a day", image: "https://tse2.mm.bing.net/th?id=OIP.J97THQJ5MT4G8HwLb1CORAAAAA&pid=Api&P=0&h=180" },
  { id: 2, name: "Bookworm", description: "Read 5 books in the virtual book club", image: "https://tse2.mm.bing.net/th?id=OIP.J97THQJ5MT4G8HwLb1CORAAAAA&pid=Api&P=0&h=180" },
  { id: 3, name: "VR Explorer", description: "Completed all VR experiences", image: "https://tse2.mm.bing.net/th?id=OIP.J97THQJ5MT4G8HwLb1CORAAAAA&pid=Api&P=0&h=180" },
  { id: 4, name: "Wellness Warrior", description: "Logged activities for 100 consecutive days", image: "https://tse2.mm.bing.net/th?id=OIP.J97THQJ5MT4G8HwLb1CORAAAAA&pid=Api&P=0&h=180" },
];

export default function CertificationsAndBadges() {
  const [selectedCertification, setSelectedCertification] = useState(certifications[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShare = () => {
    // Implement sharing functionality here
    console.log("Sharing certificate:", selectedCertification.name);
  };

  const handleDownload = () => {
    // Implement download functionality here
    console.log("Downloading certificate:", selectedCertification.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Achievements</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <CustomCard key={cert.id} title={cert.name} description={cert.description}>
              <img src={cert.image} alt={cert.name} className="w-full h-auto" />
              <div className="mt-4">
                <Button onClick={() => { setSelectedCertification(cert); setIsDialogOpen(true); }}>
                  View Certificate
                </Button>
              </div>
            </CustomCard>
          ))}
        </div>

        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center text-center">
              <img src={badge.image} alt={badge.name} className="w-20 h-20 mb-2" />
              <h3 className="font-semibold">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold">{selectedCertification.name}</h2>
            <p>{selectedCertification.description}</p>
            <div className="py-4">
              <img src={selectedCertification.image} alt={selectedCertification.name} className="w-full h-auto" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      <CustomCard
        title="Your Wellness Journey"
        description="Track your progress and unlock new achievements"
        footer={
          <Button>View All Achievements</Button>
        }
      >
        <div className="space-y-2">
          <p>Total Certifications: {certifications.length}</p>
          <p>Total Badges: {badges.length}</p>
          <p>Next Achievement: "Meditation Master" - Complete 100 meditation sessions</p>
        </div>
      </CustomCard>
    </div>
  );
}

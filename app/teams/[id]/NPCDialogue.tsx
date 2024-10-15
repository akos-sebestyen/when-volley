import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // shadcn Avatar
import { MessageSquare } from "lucide-react"; // Example of using lucide-react for icon
import { Press_Start_2P } from "next/font/google"; // Importing the font from Next.js

// Load the Press Start 2P font
const pressStart2P = Press_Start_2P({
  weight: "400", // Default weight for this font
  subsets: ["latin"],
});

export default function NPCDialogue() {
  return (
    <div className="flex items-start space-x-4 p-4 bg-accent rounded-lg max-w-2xl mx-auto">
      {/* Avatar (NPC) */}
      <Avatar className="w-16 h-16">
        <AvatarImage src="/image/pro-player.webp" alt="NPC" />
        <AvatarFallback>
          <MessageSquare className="w-10 h-10 text-gray-500" />
        </AvatarFallback>
      </Avatar>

      {/* Dialogue Box */}
      <div
        className={`relative bg-yellow-200 text-gray-900 p-4 rounded-lg shadow-lg border border-yellow-300 ${pressStart2P.className}`}
      >
        <div className="text-sm">
          <strong className="block font-bold mb-1">Volley Pro:</strong>
          <p>
            You can bookmark your team&#39;s page and never touch your keyboard
            again.
          </p>
        </div>
        {/* Speech Bubble Arrow */}
        <div className="absolute left-[-12px] top-6 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-yellow-200" />
      </div>
    </div>
  );
}

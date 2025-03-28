"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow, isPast } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChevronDown, ChevronUp } from "lucide-react"


interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  currentBid: number
  bidCount: number
  endTime: string
  description: string
  image: string
  status: "active" | "ending-soon" | "ended"
  bids: Array<{
    id: string
    amount: number
    bidder: string
    time: string
  }>
}

interface CarAuctionCardProps {
  car: Car
  onBidClick: (car: Car) => void
}

export function CarAuctionCard({ car, onBidClick }: CarAuctionCardProps) {
  const [showBidHistory, setShowBidHistory] = useState(false)

  const isEnded = isPast(new Date(car.endTime))
  

  // Determine status badge color and text
  const getStatusBadge = () => {
    if (isEnded || car.status === "ended") {
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          Auction Ended
        </Badge>
      )
    } else if (car.status === "ending-soon") {
      return <Badge variant="destructive">Ending Soon</Badge>
    } else {
      return <Badge variant="secondary">Active</Badge>
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={car.image || "/placeholder.svg"} alt={`${car.make} ${car.model}`} fill className="object-cover" />
        {getStatusBadge()}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Bid</p>
            <p className="text-lg font-bold">${car.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Starting Price</p>
            <p className="text-lg">${car.price.toLocaleString()}</p>
          </div>
        </div>

       
      </CardContent>

      <CardFooter className="flex flex-col p-4 pt-0 gap-3">
        <Button className="w-full" disabled={isEnded || car.status === "ended"} onClick={() => onBidClick(car)}>
          {isEnded || car.status === "ended" ? "Auction Ended" : "Place Bid"}
        </Button>

        

        
      </CardFooter>
    </Card>
  )
}


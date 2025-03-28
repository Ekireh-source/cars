"use client"

import { CarAuctionCard } from "@/components/car-auction-card"

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

interface CarAuctionListProps {
  cars: Car[]
  onBidClick: (car: Car) => void
}

export function CarAuctionList({ cars, onBidClick }: CarAuctionListProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-lg font-medium">No cars found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarAuctionCard key={car.id} car={car} onBidClick={onBidClick} />
      ))}
    </div>
  )
}


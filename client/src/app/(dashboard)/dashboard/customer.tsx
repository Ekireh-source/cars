"use client"

import { useEffect, useState } from "react"
import { CarAuctionList } from "@/components/car-auction-list"
import { BidModal } from "@/components/bid-modal"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { get, post } from "@/lib/fetch"

// Update the Car interface at the top of the file to match the one in car-auction-list.tsx
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

// Sample data - in a real app, this would come from an API
const sampleCars = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2022,
    price: 79000,
    currentBid: 81500,
    bidCount: 8,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    description: "Dual motor all-wheel drive, autopilot, premium interior",
    image: "/placeholder.svg?height=300&width=500",
    status: "active",
    bids: [
      { id: "b1", amount: 81500, bidder: "user123", time: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
      { id: "b2", amount: 80000, bidder: "user456", time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: "b3", amount: 79500, bidder: "user789", time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "2",
    make: "BMW",
    model: "M4",
    year: 2023,
    price: 72000,
    currentBid: 74500,
    bidCount: 5,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
    description: "Competition package, carbon fiber trim, M sport exhaust",
    image: "/placeholder.svg?height=300&width=500",
    status: "ending-soon",
    bids: [
      { id: "b4", amount: 74500, bidder: "user222", time: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
      { id: "b5", amount: 73000, bidder: "user333", time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "3",
    make: "Porsche",
    model: "911 Carrera",
    year: 2021,
    price: 110000,
    currentBid: 112000,
    bidCount: 12,
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    description: "PDK transmission, sport chrono package, premium sound system",
    image: "/placeholder.svg?height=300&width=500",
    status: "active",
    bids: [
      { id: "b6", amount: 112000, bidder: "user444", time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: "b7", amount: 111000, bidder: "user555", time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: 2022,
    price: 95000,
    currentBid: 96000,
    bidCount: 3,
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (ended)
    description: "Executive package, Burmester sound system, MBUX infotainment",
    image: "/placeholder.svg?height=300&width=500",
    status: "ended",
    bids: [
      {
        id: "b8",
        amount: 96000,
        bidder: "user666",
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "b9",
        amount: 95500,
        bidder: "user777",
        time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
]

export default function AuctionPage() {
  // Then update the useState declaration to use this interface
  const [cars, setCars] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("endingSoon")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)

  

  const handleBidClick = (car: any) => {
    setSelectedCar(car)
    setIsBidModalOpen(true)
  }

  const handlePlaceBid = async (carId: string, bidAmount: number) => {
    // In a real app, this would be an API call
    const data = {
        "amount" : bidAmount
    }
    console.log("carId: ", carId);

    console.log("bidamount: ", bidAmount)
    const bid = await post<any>(`cars/${carId}/bids/`, data)
    console.log(bid)
    setIsBidModalOpen(false)
  }

   useEffect(() => {
      const getCars = async () => {
        try {
         
          const carResponse = await get<any>("cars/")
          setCars(carResponse.data.data)
          console.log(carResponse)
        } catch (error) {
          console.error("Error fetching cars:", error)
          
        } 
      }
  
      getCars()
    }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <h1 className="text-xl font-bold">Car Auction Platform</h1>
        </div>
      </header>

      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cars..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Auctions</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="endingSoon">Ending Soon</SelectItem>
                  <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Models</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CarAuctionList cars={cars} onBidClick={handleBidClick} />
        </div>
      </main>

      {selectedCar && (
        <BidModal
          isOpen={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          car={selectedCar}
          onPlaceBid={handlePlaceBid}
        />
      )}
    </div>
  )
}


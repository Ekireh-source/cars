"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDistanceToNow } from "date-fns"

interface Car {
  id: string
  make: string
  model: string
  year: number
  currentBid: number
  endTime: string
  status: string
}

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  car: Car
  onPlaceBid: (carId: string, bidAmount: number) => void
}

export function BidModal({ isOpen, onClose, car, onPlaceBid }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(car.currentBid + 500)
  const [error, setError] = useState("")

  const minBid = car.currentBid + 100
  const isEnded = new Date(car.endTime) < new Date() || car.status === "ended"

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setBidAmount(value)

    if (value <= car.currentBid) {
      setError(`Bid must be higher than current bid of $${car.currentBid.toLocaleString()}`)
    } else if (value < minBid) {
      setError(`Minimum bid increment is $100. Please bid at least $${minBid.toLocaleString()}`)
    } else {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (bidAmount <= car.currentBid) {
      setError(`Bid must be higher than current bid of $${car.currentBid.toLocaleString()}`)
      return
    }

    if (bidAmount < minBid) {
      setError(`Minimum bid increment is $100. Please bid at least $${minBid.toLocaleString()}`)
      return
    }

    onPlaceBid(car.id, bidAmount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            {car.year} {car.make} {car.model}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              
              
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
              <Input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={handleBidChange}
                min={minBid}
                step="100"
                disabled={isEnded}
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">Minimum bid increment is $100</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!!error || isEnded || bidAmount <= car.currentBid}>
              Place Bid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


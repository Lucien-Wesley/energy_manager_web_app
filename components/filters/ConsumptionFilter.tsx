"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Filter,
  Check,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock data for rooms and devices
const mockRooms = [
  { id: "living-room", name: "Living Room" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bedroom", name: "Bedroom" },
  { id: "bathroom", name: "Bathroom" },
  { id: "office", name: "Home Office" }
];

const mockDevices = [
  { id: "tv", name: "TV", room: "living-room" },
  { id: "lights-living", name: "Lights", room: "living-room" },
  { id: "fridge", name: "Refrigerator", room: "kitchen" },
  { id: "microwave", name: "Microwave", room: "kitchen" },
  { id: "dishwasher", name: "Dishwasher", room: "kitchen" },
  { id: "bedroom-lights", name: "Lights", room: "bedroom" },
  { id: "ac", name: "Air Conditioner", room: "bedroom" },
  { id: "bathroom-lights", name: "Lights", room: "bathroom" },
  { id: "water-heater", name: "Water Heater", room: "bathroom" },
  { id: "computer", name: "Computer", room: "office" },
  { id: "monitor", name: "Monitor", room: "office" },
  { id: "printer", name: "Printer", room: "office" }
];

export default function ConsumptionFilter() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  
  // Toggle room selection
  const toggleRoom = (roomId: string) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
      
      // Remove all devices in this room from selection
      const roomDevices = mockDevices.filter(device => device.room === roomId);
      const roomDeviceIds = roomDevices.map(device => device.id);
      setSelectedDevices(selectedDevices.filter(id => !roomDeviceIds.includes(id)));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
      
      // Add all devices in this room to selection
      const roomDevices = mockDevices.filter(device => device.room === roomId);
      const roomDeviceIds = roomDevices.map(device => device.id);
      setSelectedDevices([...selectedDevices, ...roomDeviceIds.filter(id => !selectedDevices.includes(id))]);
    }
  };
  
  // Toggle device selection
  const toggleDevice = (deviceId: string, roomId: string) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
      
      // Check if all devices in room are deselected to update room state
      const roomDevices = mockDevices.filter(device => device.room === roomId);
      const roomDeviceIds = roomDevices.map(device => device.id);
      const remainingSelectedInRoom = selectedDevices
        .filter(id => id !== deviceId)
        .filter(id => roomDeviceIds.includes(id));
      
      if (remainingSelectedInRoom.length === 0 && selectedRooms.includes(roomId)) {
        setSelectedRooms(selectedRooms.filter(id => id !== roomId));
      }
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
      
      // Add room to selection if not already selected
      if (!selectedRooms.includes(roomId)) {
        setSelectedRooms([...selectedRooms, roomId]);
      }
    }
  };
  
  // Check if all devices in room are selected
  const areAllDevicesInRoomSelected = (roomId: string) => {
    const roomDevices = mockDevices.filter(device => device.room === roomId);
    return roomDevices.every(device => selectedDevices.includes(device.id));
  };
  
  // Apply filters
  const applyFilters = () => {
    console.log('Selected rooms:', selectedRooms);
    console.log('Selected devices:', selectedDevices);
    // In a real app, this would trigger data fetching with the selected filters
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedRooms([]);
    setSelectedDevices([]);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-primary" />
          <CardTitle>Filters</CardTitle>
        </div>
        <CardDescription>
          Filter consumption data by room and device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <Accordion type="multiple" defaultValue={["rooms"]}>
            <AccordionItem value="rooms">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Rooms
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {mockRooms.map(room => (
                    <div key={room.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`room-${room.id}`} 
                        checked={selectedRooms.includes(room.id)}
                        onCheckedChange={() => toggleRoom(room.id)}
                      />
                      <Label
                        htmlFor={`room-${room.id}`}
                        className="flex-1 text-sm cursor-pointer"
                      >
                        {room.name}
                      </Label>
                      {areAllDevicesInRoomSelected(room.id) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="devices">
              <AccordionTrigger className="py-2">Devices</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {mockRooms.map(room => {
                    const roomDevices = mockDevices.filter(device => device.room === room.id);
                    if (roomDevices.length === 0) return null;
                    
                    return (
                      <div key={`devices-${room.id}`} className="space-y-2">
                        <h4 className="text-sm font-medium">{room.name}</h4>
                        <div className="pl-4 space-y-2">
                          {roomDevices.map(device => (
                            <div key={device.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`device-${device.id}`} 
                                checked={selectedDevices.includes(device.id)}
                                onCheckedChange={() => toggleDevice(device.id, room.id)}
                              />
                              <Label
                                htmlFor={`device-${device.id}`}
                                className="flex-1 text-sm cursor-pointer"
                              >
                                {device.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {room.id !== mockRooms[mockRooms.length - 1].id && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
        
        <div className="flex justify-between mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button 
            size="sm"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
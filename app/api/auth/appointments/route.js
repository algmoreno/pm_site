import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Create new appointment
export async function POST(req){
  try {
    await mongoClient(); 
    const { userId, date, duration, price } = await req.json();

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //creating new appointment 
    const newAppointment = await Appointment.create({ user: userId, date, duration, price }); 

    // pushing appointment object ref to user appointment array
    user.appointments.push(newAppointment._id);
    await user.save();

    return NextResponse.json({ message: "Appointment added!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message, status: 500 });
  }
}

// Get all appointments 
export async function GET() {
  try {
    await mongoClient();
    const appointments = await Appointment.find().populate("user");
    return NextResponse.json({ appointments },  { status: 201 });
  } catch (err) {
    return new NextResponse.json({ error: err.message, status: 500 });
  }
}
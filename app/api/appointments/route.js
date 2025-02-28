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
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    //creating new appointment 
    const newAppointment = await Appointment.create({ user: userId, date, duration, price }); 

    // pushing appointment object ref to user appointment array -- also need to push all appointments to admin account
    user.appointments.push(newAppointment._id);
    await user.save();

    return new Response(JSON.stringify({ message: 'Appointment added', appointment: newAppointment }), { status: 201 });
  } catch (err) {
    console.error('Error inserting appointment:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Get all appointments 
export async function GET() {
  try {
    await mongoClient();
    const appointments = await Appointment.find();

    return new Response(JSON.stringify(appointments), { status: 201 });
  } catch (err) {
    console.error('Error finding appointments:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
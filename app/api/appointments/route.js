import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import { NextResponse } from 'next/server';

// Create new appointment
export async function POST(req){
  try {
    await mongoClient(); 
    const body = await req.json();
    const newAppointment = await Appointment.create(body); 

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
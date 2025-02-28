import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import { NextResponse } from 'next/server';

// Get user appointments
export async function GET(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(appointment), { status: 201 });
  } catch (err) {
    console.error('Error finding appointment:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Edit appointment
export async function PUT(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const update = await req.json();
    const updatedAppointment = await Appointment.findByIdAndUpdate(params.id, update, { new: true });

    if (!updatedAppointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Appointment updated', appointment: updatedAppointment }), { status: 200 });
  } catch (err) {
    console.error('Error updating user:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Delete appointment
export async function DELETE(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const deletedAppointment = await Appointment.findByIdAndDelete(params.id);

    if (!deletedAppointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Appointment deleted' }), { status: 200 });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
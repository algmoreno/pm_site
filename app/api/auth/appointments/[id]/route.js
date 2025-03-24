import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Get user appointments
export async function GET(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const appointment = await Appointment.findById(params.id).populate("user");

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete appointment
export async function DELETE(req, context) {
  const params = await context.params;
  try {
    await mongoClient();
    const { userId } = await req.json();
    const deletedAppointment = await Appointment.findByIdAndDelete(params.id);

    if (!deletedAppointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { appointments: params.id }
    });

    return NextResponse.json({ message: "Appointment deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
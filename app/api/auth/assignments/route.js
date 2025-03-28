import { ObjectId } from "mongodb";
import mongoClient from "@/app/lib/mongodb";
import Assignment from "@/app/models/Assignment";
import User from "@/app/models/User";
import { NextResponse } from 'next/server';

// Post new Assignment
export async function POST(req){
  try {
    await mongoClient(); 
    const { userId, dateAssigned, title, notes, filePaths } = await req.json();
    console.log("dateAssigned", dateAssigned)
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // creating new Assignment 
    const newAssignment = await Assignment.create({ user: userId, dateAssigned, title, notes, filePaths }); 

    // pushing Assignment object ref to user Assignment array
    user.assignments.push(newAssignment._id);
    await user.save();

    return NextResponse.json({ message: "Assignment added!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message, status: 500 });
  }
}

// Get all Assignments 
export async function GET() {
  try {
    await mongoClient();
    const assignments = await Assignment.find().populate("user");
    return NextResponse.json({ assignments },  { status: 201 });
  } catch (err) {
    return new NextResponse.json({ error: err.message, status: 500 });
  }
}
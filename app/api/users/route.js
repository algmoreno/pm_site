import { ObjectId } from "mongodb";
import mongoClient from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(request){
  try {
    await mongoClient()
    const {name, email} = await request.json()
    const newUser = new User({name, email})
    await newUser.save()
    return NextResponse.json(newUser, {status: 201})
  } catch (err) {
    console.log(err);
  }
}


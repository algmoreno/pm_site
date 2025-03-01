import NextAuth from 'next-auth';
import User from '@app/models/user';
import mongoClient from '@app/lib/mongodb';
import bcrypt from 'bcrypjs';
import CredentialsProvider from 'next-auth/providers/credentials';
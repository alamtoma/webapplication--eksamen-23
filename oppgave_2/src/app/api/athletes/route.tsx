import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import schema from "./schema";

type AthleteRequestBody = {
    email: string;
    name: string;
    gender: 'MALE'| 'FEMALE'| 'NON_BINARY'| 'OTHER';
    sport:  'RUN'| 'BIKE'| 'CROSS_COUNTRY_SKI'| 'TRIATHLON'| 'SWIMMING'| 'STRENGTH'| 'OTHER';
  }

export async function POST(request: NextRequest) {
const body = await request.json() as AthleteRequestBody;
const validation = schema.safeParse(body);
if (!validation.success) 
    return NextResponse.json(validation.error.errors, {status: 400});

    const athlete = await prisma.athlete.findUnique({
        where: {
            email: body.email
        }
    });

    if (athlete)
        return NextResponse.json({error: 'Athlete already exists'}, {status: 400});

    const newAthlete = await prisma.athlete.create({
        data: {
            email: body.email,
            name: body.name,
            gender: body.gender,
            sport: body.sport
        }
    })

return  NextResponse.json(newAthlete, {status: 201});

   

} 
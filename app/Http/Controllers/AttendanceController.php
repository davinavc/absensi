<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Redirect;

class AttendanceController extends Controller
{
    public function submit(Request $request) {
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,permit,leave,business_trip,remote|max:500',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' => 'required',
        ]);
        
        Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address,
        ]);
        
        return redirect::route('users');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    static function isTodayAttendanceSubmitted(): bool
    {
        $userId = auth()->id();
        if (!$userId) {
            return false;
        }

        return Attendance::where('user_id', $userId)
                        ->whereDate('created_at', now()->toDateString())
                        ->exists();
    }

    public function index(): Response
    {
        $attendances = Attendance::with('user')->paginate(10);
        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

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

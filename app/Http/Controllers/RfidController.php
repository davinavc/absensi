<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Events\ReadRfidEvent;

class RfidController extends Controller
{
    public function read(Request $request){
        event(new ReadRfidEvent($request->uid, 'EXISTS', 'RFID already exists'));
        if(User::where('uid', $request->uid)->exists()){
            return response()->json([
                'message'=> 'RFID Read already exists',
                'code' => 'EXISTS',
                'UID' => $request->uid,
            ]);
        } else{
            event(new ReadRfidEvent($request->uid, 'Success', 'RFID read'));
            return response()->json([
                'message'=> 'RFID Read',
                'code' => 'Success',
                'UID' => $request->uid,
        ]);}
    }
   
}

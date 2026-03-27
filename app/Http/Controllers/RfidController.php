<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RfidController extends Controller
{
    public function read(Request $request){
        if(User::where('uid', $request->uid)->exists()){
            return response()->json([
                'message'=> 'RFID Read already exists',
                'code' => 'EXISTS',
                'UID' => $request->uid,
            ]);
        } else{
            return response()->json([
                'message'=> 'RFID Read',
                'code' => 'Success',
                'UID' => $request->uid,
        ]);}
    }
   
}

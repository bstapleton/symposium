<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;

class UserController extends BaseController
{
    private function getToken($email, $password)
    {
        $token = null;

        try
        {
            if (!$token = JWTAuth::attempt(['email'=>$email, 'password'=>$password]))
            {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        }
        catch (JWTAuthException $e)
        {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }

        return $token;
    }

    public function login(Request $request)
    {
        $user = \App\User::where('email', $request->email)->get()->first();

        if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
        {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];           
        }
        else 
        {
          $response = ['success'=>false, 'data'=>'Record doesnt exists'];
        }

        return response()->json($response, 200);
    }

    public function register(Request $request)
    { 
        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];
                  
        $user = new \App\User($payload);
        
        try
        {
            if ($user->save())
            {
                $token = self::getToken($request->email, $request->password); // generate user token
                
                if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
                
                $user = \App\User::where('email', $request->email)->get()->first();
                
                $user->auth_token = $token; // update user token
                
                $user->save();
                
                $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];        
            }
            else
            {
                $response = ['success'=>false, 'data'=>'Couldnt register user'];
            }
        }
        catch (\Illuminate\Database\QueryException $e)
        {
            $response = ['success'=>false, 'data'=>'A user with that display name or email address already exists'];
            return response()->json($response, 500);
        }
        
        return response()->json($response, 201);
    }
}
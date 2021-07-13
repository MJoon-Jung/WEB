<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    public function __construct()
    {
         $this->middleware(['guest']);
    }

    public function redirectToProvider()
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $user = Socialite::driver('github')->user();
    
    
        // dd($user);

        $user = User::firstOrCreate(
            ['email'=> $user->getEmail()],
            ['password'=> Hash::make(Str::random(24)),
            'name'=> $user->getName()]);
            
        Auth::login($user);

        return redirect()->intended('/dashboard');
        // $user->token;
    }
}
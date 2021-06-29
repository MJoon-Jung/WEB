<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index() {
        $name = 'MJoon-Jung';
        $age = 25;
        // return view('test.show', ['name' => $name, 'age' => $age]);
        return view('test.show', compact('name', 'age'));
    }
}

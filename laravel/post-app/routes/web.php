<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function(){
    return 'Welcome !!!';
});
Route::get('/test2', function(){
    return view('test.index');
});
Route::get('/test3', [TestController::class, 'index']);
// Route::get('/test3', function(){
//     $name = 'MJoon-Jung';
//     $age = 25;
//     // return view('test.show', ['name' => $name, 'age' => $age]);
//     return view('test.show', compact('name', 'age'));
// });

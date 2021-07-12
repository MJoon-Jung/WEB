<?php

use App\Http\Controllers\PostsController;
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

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';

Route::get('/post', [PostsController::class, 'post'])->name('posts.post');
Route::get('/mypost', [PostsController::class, 'myPost'])->name('posts.myPost');
Route::get('/posts/search', [PostsController::class, 'search'])->name('posts.search');
Route::get('/post/create', [PostsController::class, 'createForm'])->name('posts.createForm');
Route::get('/post/{id}', [PostsController::class, 'showPost'])->name('posts.showPost');
Route::get('/post/user/{id}', [PostsController::class, 'userPosts'])->name('posts.userPosts');
Route::delete('/post/{id}', [PostsController::class, 'destroy'])->name('posts.destroy');
Route::get('/post/create/{id}', [PostsController::class, 'modifyForm'])->name('posts.modifyForm');
Route::post('/post/store', [PostsController::class, 'store'])->name('posts.store');
Route::post('/post/store/{id}', [PostsController::class, 'patchStore'])->name('posts.patchStore');
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function mainScreen(){
        return view('posts.index');
    }
    public function creat() {
        // dd('OK');
        return view('posts.postForm');
    }
    public function showPost() {
        $post = DB::connection('mypost')->table('posts')->get('select * from posts');
        return view('posts.showPost', ['posts' => $post]);
    }
    public function store(Request $request) {
        // $request->input['title'];
        // $request->input['content'];
        $name = $request->name;
        $title = $request->title;
        $content = $request->content;

        // DB::insert('insert into posts (title, content) values (?, ?, ?)', [$title, $content]);

    }
}

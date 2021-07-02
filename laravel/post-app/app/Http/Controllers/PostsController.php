<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function post(){

        // $posts = Post::orderBy('created_at', 'desc')->get();
        // $posts = Post::latest()->paginate(5);
        // $posts = DB::table('posts')->orderBy('created_at')->simplePaginate(5);
        $posts = Post::orderBy('created_at','desc')->simplePaginate(5);

        return view('posts.index', ['posts'=>$posts]);
    }
    public function creatForm() {
        return view('posts.postForm');
    }
    // public function modifyForm() {
    //     return view('posts.postForm', );
    // }
    public function store(Request $request) {
        // $request->input['title'];
        // $request->input['content'];
        $title = $request->title;
        $content = $request->content;

        $request->validate([
            'title' => 'required|min:3',
            'content' => 'required'
        ]);

        $post = new Post();
        $post->title=$title;
        $post->content=$content;
        $post->user_id=Auth::user()->id;
        $post->save();

        return redirect('/post');
    }
}

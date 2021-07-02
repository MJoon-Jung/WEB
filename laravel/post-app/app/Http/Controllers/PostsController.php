<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->except(['post', 'showPost']);
    }

    public function post(){
        // $posts = Post::orderBy('created_at', 'desc')->get();
        // $posts = DB::table('posts')->orderBy('created_at')->simplePaginate(5);
        // $posts = Post::orderBy('updated_at','desc')->simplePaginate(5);

        $posts = Post::latest()->paginate(5);
        return view('posts.index', compact('posts'));
    }
    public function createForm() {
        return view('posts.postForm');
    }
    public function modifyForm($id){
        $post = Post::find($id);
        return view('posts.postForm', ['post'=>$post]);
    }
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
    public function patchStore(Request $request, $id) {
        // $request->input['title'];
        // $request->input['content'];
        $post = Post::find($id);
        $title = $request->title;
        $content = $request->content;

        $request->validate([
            'title' => 'required|min:3',
            'content' => 'required'
        ]);

        $post->title=$title;
        $post->content=$content;
        $post->user_id=Auth::user()->id;
        $post->save();

        return redirect('/post');
    }
    public function showPost(Request $request, $id){
        $page = $request->page;
        $post = Post::find($id);

        return view('posts.showPost', compact('post', 'page'));
    }
    public function destroy($id){
        $post = Post::find($id);
        if($post->user_id === Auth::user()->id){
            Post::destroy($id);
            return redirect('/post');
        }
        dd('false');
        return;
    }
}

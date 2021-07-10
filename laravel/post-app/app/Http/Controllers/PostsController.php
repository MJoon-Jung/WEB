<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

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

        $posts = Post::latest()->paginate(6);
        return view('posts.index', compact('posts'));
    }
    public function myPost(){
        $posts = auth()->user()->posts()->latest()->paginate(6);
        return view('posts.index', compact('posts'));
    }
    public function search(Request $request) {
        $keyword = $request->keyword;
        $posts = Post::where('title', 'like', '%' . $keyword . '%')->orWhere('content', 'like', '%' . $keyword . '%')->latest()->paginate(6);
        return view('posts.index', compact('posts', 'keyword'));
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

        if ($request->file('imgFile')) {
            $post->image = $this->uploadPostImage($request);
        }

        $post->save();
        
        return redirect('/post/'.$post->id);
    }
    public function patchStore(Request $request, $id) {
        // $request->input['title'];
        // $request->input['content'];
        $post = Post::findOrFail($id);
        if($request->user()->cannot('update', $post)) {
            return abort(403);
        }
        // if($post->user_id !== Auth::user()->id) {
        //     return abort(403);
        // }
        $title = $request->title;
        $content = $request->content;
        $request->validate([
            'title' => 'required|min:3',
            'content' => 'required|max:300',
            'imgFile' => 'image|max:2000'
        ]);

        $post->title=$title;
        $post->content=$content;
        $post->user_id=Auth::user()->id;

        if ($request->file('imgFile')) {
            $imagePath = 'public/images/'.$post->image;
            Storage::delete($imagePath);
            $post->image = $this->uploadPostImage($request);
        }

        $post->save();

        return redirect('/post/'.$post->id);
    }
    protected function uploadPostImage($request) {
        $name = $request->file('imgFile')->getClientOriginalName();
        $extension = $request->file('imgFile')->extension();
        $nameWithoutExtension = Str::of($name)->basename('.'. $extension);
        
        $fileName = $nameWithoutExtension . '_' . time() . '.' . $extension;

        $request->file('imgFile')->storeAs('public/images', $fileName);

        return $fileName;
    }
    public function showPost(Request $request, $id){
        $page = $request->page;
        $post = Post::find($id);
        $post->count++; //조회수
        $post->save();
        return view('posts.showPost', compact('post', 'page'));
    }
    public function destroy(Request $request, $id){
        $page = $request->page;
        $post = Post::find($id);
        
        if($request->user()->cannot('delete', $post)) {
            return abort(403);
        }
        // if($post->user_id !== Auth::user()->id){
        //     return abort(403);
        // }
        if($post->image){
            $imagePath = 'public/images/'.$post->image;
            Storage::delete($imagePath);
        }
        Post::destroy($id);
        return redirect()->route('posts.post', compact('page'));
    }
}

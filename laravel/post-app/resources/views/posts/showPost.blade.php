<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="w-full md:w-auto md:flex-grow md:flex md:items-center">
        <a href="/post" rel="home">
        <svg class="w-10 h-10 text-purple-600" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
            <title>TailwindCSS</title>
            <path fill="currentColor" d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
        </svg>
        </a>
    <ul class="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
        <li>
        @if (Auth::user())
            <a href="/post/create" class="block px-4 py-1 md:p-2 lg:px-4" title="Link">posting</a>
        @endif
        </li>
        <a href="{{ url('/dashboard') }}" class="block px-4 py-1 md:p-2 lg:px-4">Dashboard</a>
    </ul>
    </div>

    <div class="p-56">
        <div class="w-96 m-auto ">
            <div class=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div class="col-span-3 row-span-4 p-1 m-1">
            @isset($post->image)
                <a href="#">
                    <img
                    src='http://localhost:8000/storage/images/{{ $post->image }}'
                    alt="Placeholder"
                    class="rounded-t-xl object-cover h-48 w-full"
                    style="object-fit: cover; width: 100%;" />
                </a>
            @endisset
        </div>
        <div class="col-span-3 row-span-1">
            <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
                <div class="flex flex-row justify-between items-center">
                    <a class="flex items-center no-underline hover:underline text-black" href="#">
                    <img
                        alt="Placeholder"
                        class="block rounded-full"
                        src="https://picsum.photos/32/32/?random"
                    />
                    <span class="ml-2 text-sm">{{ $post->title }}</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-span-3 row-span-1">
            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">{{ $post->content }}</a>
                </h1>
            </header>
        </div>      
    </div>
    <p class="text-purple-600">written on {{ $post->created_at->diffForHumans() }}</p>
    @auth
        @can('update', $post)
            <a href="/post/create/{{ $post->id }}" class="text-green-400 uppercase font-bold text-sm">수정하기</a>
            <form method="POST" action="{{ route('posts.destroy', ['id'=>$post->id, 'page'=>$page]) }}">
                @method('DELETE')
                @csrf
                <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-red-600 transition duration-200 each-in-out" >삭제하기</button>
            </form>
        @endcan
    @endauth
    <a href="{{ route('posts.post', compact('page')) }}" class="text-blue-400 uppercase font-bold text-sm">목록으로 가기</a>
    <style>
        .hide-scroll-bar {
        -ms-overflow-style: none;
        scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
            display: none;
        }
    </style>
</body>
</html>
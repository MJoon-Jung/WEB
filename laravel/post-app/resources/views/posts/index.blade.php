<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Document</title>
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
            <a class="block px-4 py-1 md:p-2 lg:px-4" href="#" title="Link">Link</a>
          </li>
          <li>
            <a class="block px-4 py-1 md:p-2 lg:px-4 text-purple-600" href="#" title="Active Link">Active Link</a>
          </li>
          <li>
            <a class="block px-4 py-1 md:p-2 lg:px-4" href="/post/form" title="Link">Link</a>
          </li>
        </ul>
      </div>
</body>
</html>
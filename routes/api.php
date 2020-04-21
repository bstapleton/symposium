<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('user')->group(function() {
    Route::get('/', 'API\UserController@index'); // TODO
    Route::post('/', 'API\UserController@create'); // TODO
    Route::get('/{id}', 'API\UserController@get'); // TODO
    Route::put('/{id}', 'API\UserController@update'); // TODO
    Route::delete('/{id}', 'API\UserController@delete'); // TODO
});

Route::prefix('sections')->group(function() {
    Route::get('/', 'API\SectionController@index');
    Route::post('/', 'API\SectionController@create'); // TODO - remember to disallow only-int titles or we gonna hurt later
    Route::get('{uniqueIdentifier}', 'API\SectionController@get');
    Route::put('{id}', 'API\SectionController@update'); // TODO
    Route::delete('{id}', 'API\SectionController@delete'); // TODO - also consider how to handle cascading
    Route::get('{id}/topics', 'API\SectionController@getTopics');
    Route::get('{id}/subsections', 'API\SectionController@subsections');
    Route::get('{id}/parent', 'API\SectionController@parent');
});

Route::prefix('topics')->group(function() {
    Route::get('/', 'API\TopicController@index');
    Route::post('/', 'API\TopicController@create'); // TODO
    Route::get('{id}', 'API\TopicController@get');
    Route::put('{id}', 'API\TopicController@update'); // TODO
    Route::delete('{id}/delete', 'API\TopicController@delete'); // TODO - also consider how to handle cascading
    Route::get('{id}/posts', 'API\TopicController@getPosts');
    Route::get('{id}/section', 'API\TopicController@section');
});

Route::prefix('posts')->group(function() {
    Route::get('/', 'API\PostController@index');
    Route::post('/', 'API\PostController@create'); // TODO
    Route::get('{id}', 'API\PostController@get');
    Route::put('{id}', 'API\PostController@update'); // TODO
    Route::delete('{id}', 'API\PostController@delete'); // TODO - no need to consider cascading
    Route::get('{id}/replies', 'API\PostController@getReplies');
});

// TODO - group endpoints for non-auth/auth/admin!

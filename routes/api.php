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

Route::get('/sections', 'API\SectionController@index');
Route::get('/sections/{id}', 'API\SectionController@get');
Route::get('/sections/{id}/topics', 'API\SectionController@getTopics');

Route::get('/topics', 'API\TopicController@index');
Route::get('/topics/{id}', 'API\TopicController@get');
Route::get('/topics/{id}/posts', 'API\TopicController@getPosts');

Route::get('/posts', 'API\PostController@index');
Route::get('/posts/{id}', 'API\PostController@get');
Route::get('/posts/{id}/replies', 'API\PostController@getReplies');

<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth', 'api-header']], function () {
    Route::get('users/list', function(){
        $users = App\User::all();
        
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});
// Route::post('login', 'API\AuthController@login');
// Route::post('register', 'API\AuthController@register');

Route::group(['middleware' => 'api-header'], function () {
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them

    Route::post('user/login', 'API\UserController@login');
    Route::post('user/register', 'API\UserController@register');
});

// Route::prefix('admin')->group(function() {
//     Route::post('login', 'API/AuthController@adminLogin');
//     Route::post('register', 'API/AuthController@adminRegister');
// });

Route::prefix('sections')->group(function() {
    Route::get('/', 'API\SectionController@index');
    Route::post('/', 'API\SectionController@create')->middleware(['auth:api', 'scope:create-sections']); // TODO - remember to disallow only-int titles or we gonna hurt later
    Route::get('{uniqueIdentifier}', 'API\SectionController@get');
    Route::put('{id}', 'API\SectionController@update')->middleware(['auth:api', 'scope:edit-sections']); // TODO
    Route::delete('{id}', 'API\SectionController@delete')->middleware(['auth:api', 'scope:delete-sections']); // TODO - also consider how to handle cascading
    Route::get('{id}/topics', 'API\SectionController@getTopics');
    Route::get('{id}/subsections', 'API\SectionController@subsections');
    Route::get('{id}/parent', 'API\SectionController@parent');
});

Route::prefix('topics')->group(function() {
    Route::get('/', 'API\TopicController@index');
    Route::post('/', 'API\TopicController@create')->middleware(['auth:api', 'scope:create']);
    Route::get('{id}', 'API\TopicController@get');
    Route::put('{id}', 'API\TopicController@update')->middleware(['auth:api', 'scope:edit']); // TODO
    Route::put('{id}/delete', 'API\TopicController@destroy')->middleware(['auth:api', 'scope:delete']);
    Route::get('{id}/posts', 'API\TopicController@getPosts');
    Route::get('{id}/section', 'API\TopicController@section');
});

Route::prefix('posts')->group(function() {
    Route::get('/', 'API\PostController@index');
    Route::post('/', 'API\PostController@create')->middleware(['auth:api', 'scope:create']);
    Route::get('{id}', 'API\PostController@get');
    Route::put('{id}', 'API\PostController@update')->middleware(['auth:api', 'scope:edit']); // TODO
    Route::put('{id}/delete', 'API\PostController@destroy')->middleware(['auth:api', 'scope:delete']);
    Route::put('{id}', 'API\PostController@unpublish')->middleware(['auth:api', 'scope:delete']); // TODO
    Route::get('{id}/replies', 'API\PostController@getReplies');
});

// TODO - group endpoints for non-auth/auth/admin!

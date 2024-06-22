<?php

namespace App\Booking\Controllers;

use App\Booking\Models\MagicLink;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Appointment/Index');
    }

    public function generateMagicLink(Request $request)
    {
        $user = Auth::user();

        $secretCode = Str::random(10);

        $encryptedUserId = Crypt::encryptString($user->id);

        $expiresAt = now()->addHours(24);

        $magicLink = new MagicLink();
        $magicLink->user_id = $user->id;
        $magicLink->code = $secretCode;
        $magicLink->expires_at = $expiresAt;
        $magicLink->save();

        $magicLinkUrl = url('/appointment/' . $secretCode . '/' . $encryptedUserId);

        return response()->json([
            'magic_link' => $magicLinkUrl,
            'secret_code' => $secretCode,
            'expires_at' => $expiresAt,
        ]);
    }

    public function handleMagicLink($code, $encryptedUserId)
    {
        // Decrypt the user's ID
        try {
            $userId = Crypt::decryptString($encryptedUserId);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid magic link'], 404);
        }

        // Validate the magic link code
        $magicLink = MagicLink::where('code', $code)->where('user_id', $userId)->first();

        if (!$magicLink) {
            return response()->json(['message' => 'Invalid magic link'], 404);
        }

        // Retrieve the associated user
        $user = $magicLink->user;

        // Perform actions (e.g., log the user in, show a special page, etc.)
        // For example, you might log the user in:
        // Auth::login($user);

        /*return response()->json([
            'message' => 'Magic link valid',
            'user' => $user,
        ]);*/

        return Inertia::render('Booking/Index', [
            'user' => $user,
        ]);
    }
}

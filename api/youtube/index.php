<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300');

$channelId = 'UCJfBhcCIDi1nuhFsdvqQLcg';
$feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' . $channelId;

$ctx = stream_context_create([
    'http' => [
        'timeout' => 8,
        'header' => "User-Agent: Mozilla/5.0 (compatible; AdPulseBot/1.0)\r\n"
    ]
]);

$xml = @file_get_contents($feedUrl, false, $ctx);
if (!$xml && function_exists('curl_init')) {
    $ch = curl_init($feedUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; AdPulseBot/1.0)');
    $xml = curl_exec($ch);
    curl_close($ch);
}

$videos = [];
if ($xml && preg_match_all('/<entry>([\s\S]*?)<\/entry>/', $xml, $matches)) {
    foreach ($matches[1] as $entryXml) {
        if (preg_match('/<yt:videoId>([^<]+)<\/yt:videoId>/', $entryXml, $idM) &&
            preg_match('/<title>([^<]+)<\/title>/', $entryXml, $titleM)) {
            $videos[] = [
                'id' => trim($idM[1]),
                'title' => html_entity_decode(trim($titleM[1]), ENT_QUOTES | ENT_XML1, 'UTF-8')
            ];
        }
    }
}

echo json_encode(['videos' => $videos], JSON_UNESCAPED_UNICODE);
?>

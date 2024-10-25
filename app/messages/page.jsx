import Messages from '@/components/messages';

export default async function MessagesPage() {
    // Next.js overrides the default fetch function and includes a 'cache' object
    // in the options object.
    const response = await fetch('http://localhost:8080/messages', {
        // cache: 'force-cache'    // Ensures response will be cached
        // cache: 'no-store'       // Does not cache response and always send new request
        next: {
            revalidate: 5,      // Number of seconds to reuse cache data
        }
    });
    
    const messages = await response.json();

    if (!messages || messages.length === 0) {
        return <p>No messages found</p>;
    }

    return <Messages messages={messages} />;
}

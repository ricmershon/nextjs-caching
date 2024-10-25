// 'unstable_noStore' is preferred over
// export const dynamic = 'force-dynamic' because it is more granular (scoped to a
// a function and not a file)
// import { unstable_noStore } from 'next/cache';

import Messages from '@/components/messages';

// 'revalidate' is a Next.js reserved word. Same as setting on the fetch function
// export const revalidate = 5;

// 'dynamic' is a Next.js reserved word. Takes different values. 'force-dynamic'
// is the same as cache: 'no-store'.
// export const dynamic = 'force-dynamic';

// 'fetchCache = 'force-no-store' is a Next.js reserved word and takes different values.
// 'force-no-store' is the same as cache: 'no-store'.
// export const fetchCache = 'force-no-store';

export default async function MessagesPage() {
    // unstable_noStore();
    // Next.js overrides the default fetch function and includes a 'cache' object
    // in the options object.
    const response = await fetch('http://localhost:8080/messages', {
        next: {
            tags: ['message']
        }
        // cache: 'force-cache'    // Ensures response will be cached
        // cache: 'no-store'       // Does not cache response and always send new request
        // next: {
        //     revalidate: 5,      // Number of seconds to reuse cache data
        // }
    });
    
    const messages = await response.json();

    if (!messages || messages.length === 0) {
        return <p>No messages found</p>;
    }

    return <Messages messages={messages} />;
}
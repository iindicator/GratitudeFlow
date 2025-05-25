import { config } from 'dotenv';
config();

import '@/ai/flows/generate-journal-prompt.ts';
import '@/ai/flows/suggest-reminder-time.ts';
/// <reference path='../../../../node_modules/@types/moment-duration-format/index.d.ts' />
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';

@Injectable()
export class FormatterService {

  /**
   * Convert a length in meters into a human readable string with suffix.
   * @param {number} length - Number in meters.
   * @return {string} A human readable string of length.
   */
  public formatLength(length: number): string {
    if (length < 1000) {
      return `${length} m`;
    } else {
      return `${length / 1000} km`;
    }
  }

  /**
   * Convert a duration in seconds into a human readable string with suffix.
   * @param {number} length - Duration in seconds.
   * @return {string} A human readable string of duration.
   */
  public formatDuration(seconds: number): string {
    const duration = moment.duration(seconds, 'seconds');
    return duration.format('d [days], h [hrs], m [min], s [s]');
  }
}

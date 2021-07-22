import {LiquidExtension, LiquidExtensionContext, LiquidExtensionInput, LiquidExtensionResult, logger} from '@zaius/app-sdk';

interface Rot13Input extends LiquidExtensionInput {
  value: string;
}

const INPUT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const OUTPUT = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

export class Rot13 extends LiquidExtension {
  /**
   * Performs the liquid extension.
   * @async
   * @param context of the liquid call
   * @param input any input data provided by the liquid template
   * @return either successful output (via {@link LiquidExtensionResult.success}) or an error message
   *         (via {@link LiquidExtensionResult.error})
   */
  public async perform(_context: LiquidExtensionContext, input: Rot13Input): Promise<LiquidExtensionResult> {
    // Our definition in app.yml ensures that input.value will exist (required) and will be of type string
    const value = input.value;
    try {
      // Return the transformed string value. This will be the value assigned to `foo` when using this liquid:
      // {% assign foo = app.vi_migration_poc.rot13(value: 'Sbb') %} in a Zaius campaign.
      return LiquidExtensionResult.success(this.rot13(value));
    } catch (e) {
      logger.error(e);
      return LiquidExtensionResult.error(`An unexpected error occurred: ${e}`);
    }
  }

  /**
   * Rotate by 13: transform a string value using a standard [ROT-13 transform](https://en.wikipedia.org/wiki/ROT13)
   * @param value string value to translate
   */
  private rot13(value: string) {
    let result = '';
    for (const ch of value) {
      const index = INPUT.indexOf(ch);
      if (index >= 0) {
        result += OUTPUT[index];
      } else {
        result += ch;
      }
    }
    return result;
  }
}

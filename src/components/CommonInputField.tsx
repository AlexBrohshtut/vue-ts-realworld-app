import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "CommonInputField",
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value: string) => {
        return ["text", "email", "password"].includes(value);
      }
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  setup: ({ value, type, placeholder, required }, { emit }) => {
    return () => (
      <fieldset class="form-group">
        <input
          value={value}
          onInput={($event: InputEvent) =>
            emit("input", ($event.target as HTMLInputElement).value)
          }
          class="form-control form-control-lg"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </fieldset>
    );
  }
});
